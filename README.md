## SkyGoals Project 

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


```https
  POST /login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `Email` | **Required**. Unique |
| `password` | `String` | **Required** |

```https
  GET /userData
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isLogin` | `Validation` |  |
| `userId ` | `ID` | from the cookies |

```https
  GET /userWithAge?age=number
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isLogin` | `Validation` |**Required**  |
| `isAdmin` | `Validation` | **Required** |
| `Age ` | `Number` |  **Required** |


```https
  GET /privateroute
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isLogin` | `Validation` |**Required**  |
| `isAdmin` | `Validation` | **Required** |

