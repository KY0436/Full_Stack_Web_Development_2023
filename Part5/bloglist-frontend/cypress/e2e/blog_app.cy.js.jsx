describe("Blog app", function () {
    // Initialize the information of blog
    const user = {
      username: "tester1",
      name: "Wang Wu",
      password: "111111",
    }
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/testing/reset")
  
      cy.request("POST", "http://localhost:3003/api/users", user)
      cy.visit("http://localhost:3000")
    })
  
    // Test 5.17- Login form is shown
    it("Login form is shown", function () {
      cy.contains("Log in to application")
      cy.get("input[name='Username']").should("exist")
      cy.get("input[name='Password']").should("exist")
      cy.contains("login").should("exist")
    })
  
    // Test 5.18- Successful or Unsuccesful tests for logging in
    describe("Login", function () {
      it("succeeds with correct credentials", function () {
        cy.get("input[name='Username']").type(user.username)
        cy.get("input[name='Password']").type(user.password)
        cy.get("button[type='submit']").click()
        cy.contains("User Wang Wu logged in!")
      })
  
      it("fails with wrong credentials", function () {
        cy.get("input[name='Username']").type("dasfdasf")
        cy.get("input[name='Password']").type("1234")
        cy.get("button[type='submit']").click()
        cy.contains("Wrong credentials")
      })
    })
    
    describe("When logged in", function () {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: user.username,
          password: user.password
        })
        cy.get("input[name='Username']").type(user.username)
        cy.get("input[name='Password']").type(user.password)
        cy.get("button[type='submit']").click()
      })

      // Test 5.19- Check the creating function
      it("A blog can be created", function () {
        cy.contains("create new blog").click()
        cy.get("input[name='title']").type("How to program")
        cy.get("input[name='author']").type("Master")
        cy.get("input[name='url']").type("https://programming.com")
        cy.get("button[type='submit']").contains("create").click()
        cy.contains("How to program")
      })

      // Test 5.20- Check the likes function
      it("A blog can be liked", function () {
        cy.contains("create new blog").click()
        cy.get("input[name='title']").type("How to program1")
        cy.get("input[name='author']").type("Master")
        cy.get("input[name='url']").type("https://programming.com")
        cy.get("button[type='submit']").contains("create").click()
        cy.contains("view").click()
        // Perform the action of likes
        cy.contains("How to program1 Master")
          .parent()
          .find(".likesButton")
          .click()
        cy.contains("How to program1 Master").parent().contains("1")
      })

      // Test 5.21- Check the deletion function
      it("A blog can be deleted by the user who created it", function () {
        cy.contains("create new blog").click()
        cy.get("input[name='title']").type("How to program2")
        cy.get("input[name='author']").type("Master")
        cy.get("input[name='url']").type("https://programming.com")
        cy.get("button[type='submit']").contains("create").click()
        cy.contains("view").click()

        // Perform the deletion
        cy.contains("How to program2 Master")
          .parent()
          .find("button")
          .contains("remove")
          .click()
  
        cy.on("window:confirm", () => true)
        cy.contains("How to program2 Master").should("not.exist")
      })


      // Test 5.22- Check the deletion function
      it("only the creator can see the delete button of a blog", function () {
        cy.contains("create new blog").click()
        cy.get("input[name='title']").type("How to program3")
        cy.get("input[name='author']").type("Master")
        cy.get("input[name='url']").type("https://programming3.com")
        cy.get("button[type='submit']").contains("create").click()
        cy.contains("view").click()
        cy.contains("logout").click()
  
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "tester",
          password: "00000",
        })
        cy.get("input[name='Username']").type("tester")
        cy.get("input[name='Password']").type("00000")
        cy.get("button[type='submit']").click()
        cy.contains("view").click()
  
        // Verify that the delete button is not visible to other users
        cy.contains("Test Blog Test Author")
          .parent()
          .find("button")
          .contains("delete")
          .should("not.exist")
      })

      // Test 5.23 -- Check the blogs whether are in orders
      it("Blogs are ordered according to likes", function () {
        cy.contains("new blog").click()
  
        cy.get("input[name='title']").type("Test Blog 1")
        cy.get("input[name='author']").type("Master 1")
        cy.get("input[name='url']").type("https://testblog1.com")
        cy.get("button[type='submit']").contains("create").click()
  
        cy.get("input[name='title']").type("Test Blog 2")
        cy.get("input[name='author']").type("Master 2")
        cy.get("input[name='url']").type("https://testblog2.com")
        cy.get("button[type='submit']").contains("create").click()
  
        cy.get("input[name='title']").type("Test Blog 3")
        cy.get("input[name='author']").type("Master 3")
        cy.get("input[name='url']").type("https://testblog3.com")
        cy.get("button[type='submit']").contains("create").click()
  
        cy.contains("Test Blog 1 Master 1")
          .parent()
          .find(".likesButton")
          .as("likeButton1")


        cy.contains("Test Blog 2 Master 2")
          .parent()
          .find(".likesButton")
          .as("likeButton2")

        cy.contains("Test Blog 3 Master 3")
          .parent()
          .find(".likesButton")
          .as("likeButton3")
  
        cy.contains("view").click()

        cy.get("@likeButton1").click()
        cy.wait(1000)
  
        cy.get("@likeButton2").click()
        cy.wait(1000)
        cy.get("@likeButton2").click()
        cy.wait(1000)
  
        cy.get("@likeButton3").click()
        cy.wait(1000)
        cy.get("@likeButton3").click()
        cy.wait(1000)
        cy.get("@likeButton3").click()
        cy.wait(1000)
  
        // Verify the order of blogs according to likes
        cy.get(".blog").eq(0).should("contain", "Test Blog 3 Master 3")
        cy.get(".blog").eq(1).should("contain", "Test Blog 2 Master 2")
        cy.get(".blog").eq(2).should("contain", "Test Blog 1 Master 1")
      })
    })
  })