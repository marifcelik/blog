# blog-backend
this repo is an api for blog project.  
<br >

## endpoints

### /posts
| path      | type   | detail                                                     |
| ---       | ---    | ---                                                        |
| `/`       | GET    | get all posts                                              |
| `/:id`    | GET    | get one post by id                                         |
| `/add`    | POST   | add post. takes an object containing title, cover and body |
| `/update` | PATCH  | update posts. takes same object as add                     |
| `/rm`     | DELETE | removes post by id                                         |

<br>  

### todos
- [x] crud posts
- [ ] add/update image
- [ ] jwt auth
- [ ] get posts at specific range for pagination
