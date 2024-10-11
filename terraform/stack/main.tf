# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "SanctuAnimal-ResourceGroup"
    storage_account_name = "sanctuanimalstorage"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

# Define your existing resource group
resource "azurerm_resource_group" "sanctuanimal-resource-group" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

# # Define your existing Container App
# resource "azurerm_container_app" "example" {
#   name                         = "your-existing-container-app-name"
#   container_app_environment_id = azurerm_container_app_environment.example.id
#   resource_group_name          = azurerm_resource_group.example.name
#   revision_mode                = "Single"

#   template {
#     container {
#       name   = "your-container-name"
#       image  = "your-container-image:tag"
#       cpu    = 0.25
#       memory = "0.5Gi"
#     }
#   }
# }

# # You'll need to define the Container App Environment as well
# resource "azurerm_container_app_environment" "example" {
#   name                = "your-existing-environment-name"
#   location            = azurerm_resource_group.example.location
#   resource_group_name = azurerm_resource_group.example.name
# }
