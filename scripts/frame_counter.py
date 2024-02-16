from imutils.video import count_frames
import argparse
import os

ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video", required=True,
	help="path to input video file")
ap.add_argument("-o", "--override", type=int, default=-1,
	help="whether to force manual frame count")
args = vars(ap.parse_args())