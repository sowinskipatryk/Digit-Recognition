# Digit Recognition App
App for digit recognition developed using Tensorflow model, Django on the backend and React on the frontend. <br/>
To use the tool draw a digit from 0 to 9 on the drawable canvas. <br/>
when the mouse button is released, the image of the digit is sent in a body of a request to the backend. <br/>
Then the image is decoded, converted to greyscale, resized to 28x28 pixels etc. and finally passed to the model. <br/>
The previously built and loaded TF model makes a prediction of the digit and returns an array of probabilities. <br/>
This array is then passed back to the frontend as a response. <br/>
Based on this data and created useState hooks the text and graph are updated. <br/><br/>


https://user-images.githubusercontent.com/91700001/218334455-9fe0d182-3f51-4656-8f8e-309011afdc98.mp4

