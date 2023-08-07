WORKDIR='task-manager/resources'
openssl req -newkey rsa:2048 -nodes -keyout $WORKDIR/key.pem -x509 -days 365 -out $WORKDIR/cert.pem
openssl genrsa -out $WORKDIR/rsaPrivateKey.pem 2048
openssl pkcs8 -topk8 -nocrypt -inform pem -in $WORKDIR/rsaPrivateKey.pem -outform pem -out $WORKDIR/privateKey.pem
openssl rsa -pubout -in $WORKDIR/rsaPrivateKey.pem -out $WORKDIR/publicKey.pem