<h1>Creating the api </h1>
<p>ASP.NET was used to create the base api set up.</p>
<p> This uses Model View Controllers (MVC) to handle the api set up. </p>

<h3>Model</h3>
<p>The model I used was something like: </p>

```
    {
        "userName": "example",
        "password": "example",
        "email": "example@example",
        "photos": [
            {
                "photoId": 48,
                "photoTitle": "First Post",
                "photoDescription": "This is a description",
                "photoUrl": "random url",
                "dateMade": "11/23/2018 5:00:51 PM",
                "userRefId": "example"
            }
        ]
    }
```

<p>This is done so that a photo will correspond to one specific user </p>

<h3>View</h3>
<p>We view the model through the front end of the application. </p>

<h3>Controller</h3>
<p>We use the controllers to handle our requests. An example is using the DELETE request.</p>
<p>For example, from the above model there is an issue where we could not directly edit "photos" through the usersController. To overcome this, we wrote the following code:</p>

```
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.User.FindAsync(id);
            var photosItem = from v in _context.Photo
                             where v.UserRefId == id
                             select v;
            if (user == null)
            {
                return NotFound();
            }
            _context.User.Remove(user);
            if (photosItem != null)
            {
                _context.Photo.RemoveRange(photosItem);
            }
            await _context.SaveChangesAsync();
            return Ok(user);
        }
```

<p>Essentially, this goes and finds a user for the request, if there isn't any then there will be a 404 output. Then this will loop through the database and check for the reference id in the photo photodase for the enterred user id. Nesting photos in users allowed us to do this. </p>
