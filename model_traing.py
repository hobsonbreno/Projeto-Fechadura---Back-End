import os
from imutils import paths
import face_recognition
import pickle
import cv2

DB_FILE = "encodings.pickle"
DATASET_DIR = "uploads"

# 1. Tenta carregar encodings existentes
if os.path.exists(DB_FILE):
    print("[INFO] Carregando banco existente...")
    with open(DB_FILE, "rb") as f:
        data = pickle.load(f)
    knownEncodings = data["encodings"]
    knownNames = data["names"]
else:
    print("[INFO] Nenhum banco encontrado. Criando novo...")
    knownEncodings = []
    knownNames = []

# 2. Seleciona apenas imagens novas
imagePaths = list(paths.list_images(DATASET_DIR))
for (i, imagePath) in enumerate(imagePaths):
    print(f"[INFO] Processando imagem {i + 1}/{len(imagePaths)}")
    name = os.path.basename(os.path.dirname(imagePath))

    image = cv2.imread(imagePath)
    if image is None:
        continue

    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    boxes = face_recognition.face_locations(rgb, model="cnn")
    encodings = face_recognition.face_encodings(rgb, boxes)

    for encoding in encodings:
        knownEncodings.append(encoding)
        knownNames.append(name)

# 3. Salva banco atualizado
print("[INFO] Atualizando banco de encodings...")
data = {"encodings": knownEncodings, "names": knownNames}
with open(DB_FILE, "wb") as f:
    pickle.dump(data, f, protocol=pickle.HIGHEST_PROTOCOL)

print("[INFO] Banco atualizado com sucesso.")