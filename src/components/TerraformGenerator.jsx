import React, { useState } from 'react';
import { Code2, Copy, Check, Download } from 'lucide-react';

export default function TerraformGenerator({ instanceName = 't3.large', provider = 'aws' }) {
  const [copied, setCopied] = useState(false);

  const terraformCode = `
# ==============================================================================
# INFRASENCE GENERATED TERRAFORM IAC TEMPLATE
# Provider: AWS | Recommended Instance: ${instanceName}
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# 1. Security Group Definition
resource "aws_security_group" "web_sg" {
  name        = "infrasence-web-sg"
  description = "Security group for ${instanceName} web app"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. Recommended EC2 Instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c7217cdde317cfec" # Amazon Linux 2023 AMI
  instance_type = "${instanceName}"
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  root_block_device {
    volume_size           = 100
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = {
    Name        = "Infrasence-${instanceName}-Prod"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

output "instance_public_ip" {
  value       = aws_instance.web_server.public_ip
  description = "Public IP of the recommended instance"
}
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(terraformCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(terraformCode);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `main-${instanceName}.tf`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="glass-panel p-4 sm:p-8 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            INFRASTRUCTURE AS CODE (IaC)
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <Code2 className="w-5 h-5 text-cyan-400" />
            Terraform Blueprint Generator (`main.tf`)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied HCL!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .tf</span>
          </button>
        </div>
      </div>

      <pre className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-mono text-cyan-300 overflow-x-auto max-h-72 no-scrollbar">
        {terraformCode}
      </pre>

    </div>
  );
}
