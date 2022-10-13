const ApiUrl =
  "https://g4ae417831de291-su1ot2zeon4jtmxr.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client";

class Client {
  static insert() {
    const client = {
      name: $("#nameUpd").val(),
      email: $("#emailUpd").val(),
      age: $("#ageUpd").val(),
    };
    $.ajax({
      type: "POST",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify(client),
      contentType: "application/json",
      complete: function (response) {
        if (response.status === 201) {
          $("#idUpd").val("");
          $("#nameUpd").val("");
          $("#emailUpd").val("");
          $("#ageUpd").val("");
          Client.loadAll();
          alert("Client was added");
        } else {
          alert("Client was not addes");
        }
      },
    });
  }

  static loadAll() {
    $.ajax({
      type: "GET",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      contentType: "application/json",
      success: function (data) {
        $("tbody").html("");
        for (let index = 0; index < data.items.length; ++index) {
          $("tbody").append(`<tr>
              <td class="lalign">
                <a href="#" onclick="Client.loadById(${data.items[index].id})">
                  ${data.items[index].name}
                </a>
              </td>
              <td>${data.items[index].id}</td>
              <td>${data.items[index].email}</td>
              <td>${data.items[index].age}</td>
            </tr>`);
        }
      },
      error: function () {
        alert("there are no machines");
      },
    });
  }

  static loadById(id) {
    $.ajax({
      type: "GET",
      url: ApiUrl + "/" + id,
      dataType: "json",
      crossDomain: true,
      contentType: "application/json",
      success: function (data) {
        if (data.items.length === 0) {
          alert("Client does not exist");
        } else {
          $("#client-details").html(`
              <form action="" class="form"><h1 class="title">Client Details</h1><div class="inputContainer"><input type="number" id="idUpd" class="input" value="${data.items[0].id}" placeholder="a"/><label for="idUpd" class="label">Id</label></div>
              <div class="inputContainer"><input type="text" id="nameUpd" class="input" value="${data.items[0].name}" placeholder="a"/> <label for="nameUpd" class="label">Name</label></div>
              <div class="inputContainer"><input type="text" id="emailUpd" class="input" value="${data.items[0].email}" placeholder="a"/> <label for="emailUpd" class="label">Email</label></div>
              <div class="inputContainer"><input type="number" id="ageUpd" class="input" value="${data.items[0].age}" placeholder="a"/> <label for="ageUpd" class="label">Age</label></div>
              <section id="button-Detail" class="buttonDetails">
              <button onclick="Client.insert()" type="button" class="submitBtn">Insert</button>
              <button onclick="Client.update()" type="button" class="submitBtn">Update</button>
              <button onclick="Client.deleteById(${data.items[0].id})" type="button" class="submitBtn">Delete</button></section>
            `);
        }
      },
      error: function () {},
    });
  }

  static update() {
    const client = {
      id: $("#idUpd").val(),
      name: $("#nameUpd").val(),
      email: $("#emailUpd").val(),
      age: $("#ageUpd").val(),
    };
    $.ajax({
      type: "PUT",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify(client),
      contentType: "application/json",
      complete: function (response) {
        if (response.status === 200) {
          $("#idUpd").val("");
          $("#nameUpd").val("");
          $("#emailUpd").val("");
          $("#ageUpd").val("");
          Client.loadAll();
          alert("Client was updated");
        } else {
          alert("Book was not updated");
        }
      },
    });
  }

  static deleteById(id) {
    $.ajax({
      type: "DELETE",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify({ id }),
      contentType: "application/json",
      complete: function (response, data) {
        if (response.status === 204) {
          $("#idUpd").val("");
          $("#nameUpd").val("");
          $("#emailUpd").val("");
          $("#ageUpd").val("");
          Client.loadAll();
          alert("Client was deleted");
        } else {
          alert("Book was not deleted");
        }
      },
    });
  }
}
