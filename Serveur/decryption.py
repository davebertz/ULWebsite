from cryptography.fernet import Fernet
from os import listdir


def load_key():
    return open("key.key", "rb").read()


def decryptFiles():
    onlyfiles = [f for f in listdir() if f.startswith('result')]
    f = Fernet(load_key())
    print(onlyfiles)
    for filename in onlyfiles :
        with open(filename, "rb") as file:
            # read the encrypted data
            encrypted_data = file.read()
        # decrypt data
        decrypted_data = f.decrypt(encrypted_data)
        # write the original file
        with open(filename, "wb") as file:
            file.write(decrypted_data)

decryptFiles()