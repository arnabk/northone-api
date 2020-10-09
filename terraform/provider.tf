provider "linode" {
  token   = var.token
  version = ">=1.13.1"
}

provider "local" {}

terraform {
  required_version = ">0.11"
  required_providers {
    linode = {
      source  = "linode/linode"
      version = ">=1.13.1"
    }
  }
}
