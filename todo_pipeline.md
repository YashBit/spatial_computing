#### Commands:

npx ngrok http 3000
uvicorn main:app --reload (Need to activate base env - PIP: uvicorn fastapi,  python-multipart)
npm run dev
npx tsx conversion_script_trigger.ts

source miniconda3/bin/activate

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

## STRIPE PAYMENT INFORMATION STORAGE

- [ ] npx ngrok http 3000
- [ ] uvicorn main:app --reload
- [ ] need to run: `npx tsx conversion_script_trigger.ts`

## Sentry for Error Management

## Better UI 
   - [ ] COPY modal.com format 
   - [ ] Make it better 
   - [ ] Give multiple upload options, url/local
   - [ ] Give batch conversion options

## ALL ENVs:

- Download MiniConda:
  - Environments: MiDaS, converter_scripts (general scripts)
- Poetry: 
  - spm_cli -> spatial_converter
- Brew:
  - MP4Box, FFMPEG 

## EC2, Dockerisation, Domain Purchase, User Analytics
   - [ ] REPLACE LAMBDA FUNCTION NGROK LINKS WITH HOSTING LINKS
   - [ ] CHECK, THERE WILL BE JUST A URL CHANGE

## Marketing, Copy and Distribution