variable "do_token" {}
variable "pub_key" {}
variable "pvt_key" {}
variable "region" {}
variable "size" {}
variable "docker_link" {}
variable "domain" {}
variable "pwd" {}
variable "email" {}
variable "name_project" {}
variable "github_link" {}
variable "github_repo" {}
variable "github_branch" {}
variable "puerto" {}
variable "puerto_back" {}
variable "docker_command" {}
variable "env" {}
variable "api_url" {}
variable "endpoint" {}

locals {
  add_command = var.puerto_back != "" ? "echo '${var.api_url}=http://${digitalocean_droplet.web.ipv4_address}:${var.puerto_back}${var.endpoint}' | sudo tee -a /etc/.env" : "echo 'Everything is okk!'"
  api_command = var.puerto_back != "" ? "location ${var.endpoint} {proxy_pass http://${digitalocean_droplet.web.ipv4_address}:${var.puerto_back}${var.endpoint}; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_set_header Host $host; proxy_cache_bypass $http_upgrade; proxy_set_header X-Real-IP $remote_addr;}" : ""
}

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = var.github_repo
}
