# Variables

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "SanctuAnimal-ResourceGroup"
}

variable "environment" {
  description = "The environment to deploy to"
  type        = string

  default = "development"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be one of 'development', 'staging', or 'production'"
  }
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "Australia East"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default = {
    app = "sanctuanimal"
  }
}
