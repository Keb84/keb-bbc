# Manual Testing Plan – Photo Upload API

This document outlines five manual test scenarios for a new feature that allows audience members to upload photos from sporting events they’ve attended.

The base URL for this API would look something like:  
`https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=<filename.jpg|png>`

You can retrieve a list of uploaded images from:  
`https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos`

Each test case is written in Gherkin format and includes clear steps for manually checking the outcome, using tools like Postman or curl.

## Feature: Photo upload to sporting event endpoint

### Scenario 1: Uploading a valid JPG image

**Gherkin**

```
Given I have a valid image file named "goal-celebration.jpg"
When I upload the file using the API endpoint with the filename
Then I should receive a 200 OK response
And the image should appear in the list of uploaded photos
```

**Steps to test:**

1. Find or create a valid `.jpg` image file called `goal-celebration.jpg`.
2. Use Postman to send a request to:  
   `https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=goal-celebration.jpg`
3. Check the response – it should return `200 OK` or a success message.
4. Then go to:  
   `https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos`  
   and confirm the image is listed.

---

### Scenario 2: Uploading a valid PNG image

**Gherkin**

```
Given I have a valid image file named "team-huddle.png"
When I upload the file using the API endpoint with the filename
Then I should receive a 200 OK response
And the image should be listed in the /my-photos endpoint
```

**Steps to test:**

1. Use a valid `.png` image (e.g. `team-huddle.png`).
2. Upload it using the same API structure as scenario 1.
3. Confirm you get a `200 OK` or success response.
4. Check `/my-photos` to see if the file has been added.

---

### Scenario 3: Uploading an unsupported file type

**Gherkin**

```
Given I have a file named "fan-video.mp4"
When I upload the file using the API endpoint
Then I should receive a 400 Bad Request or similar error
And the file should not appear in the list of uploaded photos
```

**Steps to test:**

1. Try uploading a file that’s not a `.jpg` or `.png`, like `fan-video.mp4`.
2. Use this endpoint:  
   `...?upload=fan-video.mp4`
3. You should receive a `400 Bad Request`, `415 Unsupported Media Type`, or something similar.
4. Confirm the file is not shown in the list when checking `/my-photos`.

---

### Scenario 4: Listing uploaded photos after multiple uploads

**Gherkin**

```
Given I have uploaded multiple images "one.jpg", "two.png", and "three.jpg"
When I access the /my-photos endpoint
Then I should see all three images listed
```

**Steps to test:**

1. Upload three image files: `one.jpg`, `two.png`, and `three.jpg`.
2. Once done, open:  
   `https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos`
3. Make sure all three filenames are included in the returned list.

---

### Scenario 5: Uploading a photo with no filename provided

**Gherkin**

```
Given I send a request to the upload endpoint without specifying a file
When the request is submitted
Then I should receive a 400 Bad Request or relevant error response
```

**Steps to test:**

1. Use this endpoint without giving it a file name:  
   `...?upload=` or leave `upload` off entirely.
2. Submit the request.
3. The API should respond with a `400 Bad Request` or similar.
4. Double check `/my-photos` – nothing new should appear.

---
