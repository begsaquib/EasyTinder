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
- Post /request/send/interested/:userid
- Post /request/send/ignored/:userid
- Post /request/review/accepted/:requestID
- Post /request/review/rejected/:requestID

## userRequest
- get /user/connections
- get /user/requests
- get /user/feed
