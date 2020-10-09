resource "linode_instance" "instance" {
  label      = "northone-api"
  image      = var.image
  region     = var.region
  type       = var.type
  swap_size  = 256
  private_ip = false
  root_pass  = var.root_pass

  provisioner "remote-exec" {
    inline = [
      "apt update",
      "apt install wget gnupg git -y",
      "wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -",
      "echo \"deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main\" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list",
      "apt update",
      "apt install -y mongodb-org nodejs npm",
      "systemctl enable mongod",
      "systemctl start mongod",
      "npm i yarn pm2 -g",
      "pm2 startup systemd && pm2 save",
      "systemctl start pm2-root"
    ]
  }

  connection {
    type     = "ssh"
    user     = "root"
    password = var.root_pass
    host     = self.ip_address
  }

}

resource "null_resource" "update_instance" {
  provisioner "remote-exec" {
    inline = [
      "cd /root",
      "git clone https://github.com/arnabk/northone-api",
      "cd northone-api",
      "yarn",
      "yarn build",
      "cd build",
      "pm2 stop northone-api",
      "pm2 start pm2.yaml && pm2 save"
    ]
  }

  connection {
    type     = "ssh"
    user     = "root"
    password = var.root_pass
    host     = linode_instance.instance.ip_address
  }
}

output "northone_api" {
  value = {
    public_id = linode_instance.instance.ip_address
    id        = linode_instance.instance.id
  }
}
