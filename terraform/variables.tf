variable "type" {
  default = "g6-nanode-1"
  type    = string
}

variable "token" {
  type = string
}

variable "image" {
  default = "linode/debian10"
  type    = string
}

variable "region" {
  default = "us-west"
  type    = string
}

variable "root_pass" {
  type = string
}
