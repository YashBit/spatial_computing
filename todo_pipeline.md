

PORT = 8080 npm start 





1. CONVERT SIMPLE UI/UX LOGO + WITH COPY 
2. NEAT, SIMPLE AND RESPECTABLE
3. UPLOAD -> GET TRIGGER EMAIL  
5. GCP, Buy Domain 
EMAIL, HELP CONTACT PAGE (RESEND -> NEED DOMAIN TO BE ABLE TO SEND EMAIL)

STAGE 5: STRIPE INCLUSION

1. CREATE PAYMENT BRACKETS (HOW DOES ONE STRUCTURE THE PAYMENT PLAN)
2. FIGURE OUT YOURSELF AND 


### MAKE SURE THE PRODUCTION MACHINE IS

: ARM64 MacOS for the SpatialConversion



SpatialMediaKit for the x86_64 architecture

swiftc -target x86_64-apple-macosx10.9 -o SpatialMediaKitx86 spatial_media_kit.swift

swiftc -target x86_64-apple-macosx10.9 -o SpatialMediaKitx86 spatial_media_kit.swift
#### Commands:


SETUP GRADIENT ON PAPERSPACE:

Make sure node version is 20 - https://joshtronic.com/2023/04/23/how-to-install-nodejs-20-on-ubuntu-2004-lts/
Setup NG ROK:curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
	| sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
	| sudo tee /etc/apt/sources.list.d/ngrok.list \
	&& sudo apt update \
	&& sudo apt install ngrok
ls
source activate 
 source miniconda3/bin/activate 
WHEN NOT DEPLOYED:

npx ngrok http 3000

FASTAPI: UVICORN 
uvicorn main:app --reload (Need to activate base env - PIP: uvicorn fastapi,  python-multipart)

-> CONDA ENVS 
source miniconda3/bin/activatcde
sqlite3

WEBAPP: 
npm install
npm run dev
npx tsx conversion_script_trigger.ts

MP4Box:
apt-get install gpac 

ffmpeg:
get straight from curl 

POETRY:
NEED TO RUN CONDA ENV PARALLELY 
root@n4o9xh6ssa:/notebooks# which poetry
/root/.local/bin/poetry
curl -sSL https://install.python-poetry.org | python3 -
poetry --version
poetry install 
poetry shell
deactivate 
sudo apt-get update
sudo apt-get install python3.8-venv



How to propertly create env file?

conda env export > environment.yml 

## FINISH PIPELINE:

1. **Successfully download data** - DONE 
2. **Download locally** - DONE 
3. **Hit API** - DONE  
   - Endpoint: `/downloaded_videos`
   - Data:
     ```json
     {
       "AcceptRanges": "bytes",
       "LastModified": "2024-04-21T12:50:36.000Z",
       "ContentLength": 2863363,
       "ETag": "\"ab47a8981c64dcfd306ae3c42fad451c\"",
       "ContentType": "video/mp4",
       "ServerSideEncryption": "AES256",
       "Metadata": { "name": "sds", "email": "yb1025@nyu.edu" }
     }
     ```

4. **Finish conversion on paperspace** 
   - Upload to S3
   - Trigger and Create Email 
5. **Stripe Integration** 
6. **All Env List:** 

