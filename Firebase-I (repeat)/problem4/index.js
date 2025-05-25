const deleteUser = (key) => {
    fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch(error => console.error("Error deleting user:", error));
  };
  
  
  