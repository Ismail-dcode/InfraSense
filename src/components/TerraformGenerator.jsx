import React, { useState } from 'react';
import { Code2, Copy, Check, Download } from 'lucide-react';

export default function TerraformGenerator({ instanceName = 't3.large', provider = 'aws' }) {
  const [copied, setCopied] = useState(false);

  const normalizedProvider = provider.toLowerCase();

  const getTerraformCode = () => {
    if (normalizedProvider === 'azure') {
      return `
# ==============================================================================
# INFRASENCE GENERATED TERRAFORM IAC TEMPLATE (AZURE)
# Recommended VM Size: ${instanceName}
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "infrasence-rg"
  location = "East US"
}

# 2. Network Security Group
resource "azurerm_network_security_group" "nsg" {
  name                = "infrasence-web-nsg"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule {
    name                       = "HTTPS"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "HTTP"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# 3. Azure Virtual Machine (${instanceName})
resource "azurerm_linux_virtual_machine" "web_vm" {
  name                = "infrasence-${instanceName.toLowerCase().replace(/_/g, '-')}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = "${instanceName}"
  admin_username      = "azureuser"

  admin_ssh_key {
    username   = "azureuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

output "vm_public_ip" {
  value       = azurerm_linux_virtual_machine.web_vm.public_ip_address
  description = "Public IP of the Azure VM"
}
      `.trim();
    }

    if (normalizedProvider === 'gcp') {
      return `
# ==============================================================================
# INFRASENCE GENERATED TERRAFORM IAC TEMPLATE (GOOGLE CLOUD)
# Recommended Machine Type: ${instanceName}
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = "infrasence-gcp-project"
  region  = "us-central1"
  zone    = "us-central1-a"
}

# 1. Cloud Firewall Rule
resource "google_compute_firewall" "web_firewall" {
  name    = "infrasence-allow-web"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# 2. GCP Compute Engine Instance (${instanceName})
resource "google_compute_instance" "web_node" {
  name         = "infrasence-${instanceName}"
  machine_type = "${instanceName}"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      type  = "pd-ssd"
      size  = 100
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  labels = {
    environment = "production"
    managed_by  = "terraform"
  }
}

output "gcp_instance_ip" {
  value       = google_compute_instance.web_node.network_interface[0].access_config[0].nat_ip
  description = "External NAT IP of the Google Cloud Instance"
}
      `.trim();
    }

    // Default AWS
    return `
# ==============================================================================
# INFRASENCE GENERATED TERRAFORM IAC TEMPLATE (AWS)
# Recommended Instance: ${instanceName}
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
  };

  const terraformCode = getTerraformCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(terraformCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(terraformCode);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `main-${provider}-${instanceName}.tf`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            INFRASTRUCTURE AS CODE (IaC) • {provider.toUpperCase()}
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <Code2 className="w-5 h-5 text-blue-600" />
            Terraform Blueprint Generator (`main.tf`)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied HCL!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .tf</span>
          </button>
        </div>
      </div>

      <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-[11px] sm:text-xs font-mono text-blue-300 overflow-x-auto max-h-72 no-scrollbar leading-relaxed shadow-inner">
        {terraformCode}
      </pre>

    </div>
  );
}
