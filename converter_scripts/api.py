from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/convert-video/")
async def convert_video(file: UploadFile = File(...)):
    # Call your conversion script here
    # Process the uploaded file and trigger the conversion
    # You can pass the uploaded file to your conversion script
    # and handle the conversion process
    return {"message": "Conversion started successfully"}
