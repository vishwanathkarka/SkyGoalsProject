## SkyGoals Project 

### Signup
```https
  POST /signup
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**.  |
| `email` | `Email` | **Required**. Unique |
| `age` | `Number` | **Required**.  |
| `phoneNumber` | `Number` | **Required**.  |
| `htno` | `Sting` | - |
| `password` | `String` | **Required** |


### Login

```https
  POST /login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `Email` | **Required**. Unique |
| `password` | `String` | **Required** |

### Get UserData
```https
  GET /userData
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isLogin` | `Validation` |  |
| `userId ` | `ID` | from the cookies |


### Get User with Spific Age
```https
  GET /userWithAge?age=number
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isLogin` | `Validation` |**Required**  |
| `isAdmin` | `Validation` | **Required** |
| `Age ` | `Number` |  **Required** |


### Private Route For Getting All The Users Data
```https
  GET /privateroute
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isLogin` | `Validation` |**Required**  |
| `isAdmin` | `Validation` | **Required** |

