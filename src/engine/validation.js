const VALID_PROVIDERS = new Set(['all', 'aws', 'azure', 'gcp']);
const VALID_BUDGET_PRIORITIES = new Set(['cost', 'balanced', 'performance']);

const isNumberInRange = (value, min, max) =>
  typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;

export function validateRequirements(input = {}) {
  const errors = {};

  if (!Number.isInteger(input.vcpu) || input.vcpu < 1 || input.vcpu > 64) {
    errors.vcpu = 'vCPU must be a whole number between 1 and 64.';
  }

  if (!isNumberInRange(input.ram, 0.5, 512)) {
    errors.ram = 'RAM must be between 0.5 GB and 512 GB.';
  }

  if (!isNumberInRange(input.storageGB, 1, 65536)) {
    errors.storageGB = 'Storage must be between 1 GB and 65,536 GB.';
  }

  if (!Number.isInteger(input.iops) || input.iops < 100 || input.iops > 80000) {
    errors.iops = 'IOPS must be a whole number between 100 and 80,000.';
  }

  if (!input.workload || typeof input.workload !== 'string') {
    errors.workload = 'Select a workload profile to continue.';
  }

  if (!VALID_PROVIDERS.has(input.provider)) {
    errors.provider = 'Select a cloud provider to continue.';
  }

  if (!VALID_BUDGET_PRIORITIES.has(input.budgetPriority)) {
    errors.budgetPriority = 'Select a budget priority to continue.';
  }

  if (!Number.isInteger(input.instanceCount) || input.instanceCount < 1 || input.instanceCount > 1000) {
    errors.instanceCount = 'Instance count must be a whole number between 1 and 1,000.';
  }

  return errors;
}

