FROM archlinux:latest

RUN pacman -Syy --noconfirm
RUN pacman -Syu --noconfirm
RUN pacman -S nodejs npm --noconfirm

#RUN mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql

#RUN systemctl enable mariadb.service
#RUN systemctl start mariadb.service

RUN mkdir ./app

WORKDIR ./app

ENTRYPOINT ["npm", "run", "dev"]
