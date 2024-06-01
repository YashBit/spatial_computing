from fastapi import FastAPI, UploadFile, File
import subprocess
from subprocess import Popen, PIPE
import tempfile

app = FastAPI()

@app.post("/convert-video/")
async def convert_video(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        print(type(contents))
        print("File content read successfully.")
        with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as temp_file:
            print("In TempFile")
            temp_file.write(contents)
            temp_file_path = temp_file.name
            print(f"Temp File Path: {temp_file_path}")
        with open(temp_file_path, "rb") as temp_file:
            file_data = temp_file.read()
            file_named = temp_file.name
            print("File contents:", file_named)
        script_path = './final_pipeline.sh'
        process = subprocess.Popen([script_path, temp_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            return {"message": f"An error occurred: {stderr.decode('utf-8')}"}
        else:
            return {"message": f"Conversion started successfully. Script output: {stdout.decode('utf-8')}"}
    except Exception as e:
        return {"message": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


