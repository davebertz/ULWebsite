from cryptography.fernet import Fernet
from os import listdir


# Fichier de fonction utilisées pour crypter les fichiers contenant tous les résultats des utilisateurs
# avant de les envoyer par mail

def load_key():
    return open("key.key", "rb").read()

def encryptFile(filename):
    key = load_key()
    f = Fernet(key)
    with open(filename, "rb") as file:
        # read all file data
        file_data = file.read()
    encrypted_data = f.encrypt(file_data)
    # write the encrypted file
    with open(filename, "wb") as file:
        file.write(encrypted_data)

