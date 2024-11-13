# Easy_Tinder APIs

## AuthRouter

- Post /signup
- Post /login
- Post /logout

## ProfileRouter

- Get /profile/view
- Patch /profile/edit
- Patch /profile/password

## ConnectionRouter

status=["interested","ignored"]

- Post /request/send/:status/:userid

status=["accepted","rejected"]

- Post /request/review/:status/:requestID

## userRequest

- get /user/requests
- get /user/connections
- get /user/feed
