const ApiUrl =
  "https://g4ae417831de291-su1ot2zeon4jtmxr.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/gym/gym/";

class Gym {
  static insert() {
    const gym = {
      brand: $("#brandUpd").val(),
      model: $("#modelUpd").val(),
      category_id: $("#category_idUpd").val(),
      name: $("#nameUpd").val(),
    };
    $.ajax({
      type: "POST",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify(gym),
      contentType: "application/json",
      complete: function (response) {
        if (response.status === 201) {
          $("#idUpd").val("");
          $("#brandUpd").val("");
          $("#modelUpd").val("");
          $("#category_idUpd").val("");
          $("#nameUpd").val("");
          Gym.loadAll();
          alert("Machine was added");
        } else {
          alert("Machine was not addes");
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
                <a id="colname" href="#" onclick="Client.loadById(${data.items[index].id})">
                  ${data.items[index].name}
                </a>
              </td>
              <td>${data.items[index].id}</td>
              <td>${data.items[index].model}</td>
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
          alert("Machine does not exist");
        } else {
          $("#gym-details").html(`
              <form action="" class="form"><h1 class="title">Machine Details</h1>
              <div class="inputContainer"><input type="number" id="idUpd" class="input" value="${data.items[0].id}" placeholder="a"/><label for="idUpd" class="label">Id</label></div>
              <div class="inputContainer"><input type="text" id="brandUpd" class="input" value="${data.items[0].brand}" placeholder="a"/> <label for="brandUpd" class="label">Brand</label></div>
              <div class="inputContainer"><input type="number" id="modelUpd" class="input" value="${data.items[0].model}" placeholder="a"/> <label for="modelUpd" class="label">Model</label></div>
              <div class="inputContainer"><input type="number" id="category_idUpd" class="input" value="${data.items[0].category_id}" placeholder="a"/> <label for="category_idUpd" class="label">Catagory id</label></div>
              <div class="inputContainer"><input type="text" id="nameUpd" class="input" value="${data.items[0].name}" placeholder="a"/><label for="nameUpd" class="label">Name</label></div>
              <section id="button-Detail" class="buttonDetails">
              <button onclick="Gym.insert()" type="button" class="submitBtn">Insert</button>
              <button onclick="Gym.update()" type="button" class="submitBtn">Update</button>
              <button onclick="Gym.deleteById(${data.items[0].id})" type="button" class="submitBtn">Delete</button></section>
            `);
        }
      },
      error: function () {},
    });
  }

  static update() {
    const gym = {
      id: $("#idUpd").val(),
      brand: $("#brandUpd").val(),
      model: $("#modelUpd").val(),
      category_id: $("#category_idUpd").val(),
      name: $("#nameUpd").val(),
    };
    $.ajax({
      type: "PUT",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify(gym),
      contentType: "application/json",
      complete: function (response) {
        if (response.status === 200) {
          $("#idUpd").val("");
          $("#brandUpd").val("");
          $("#modelUpd").val("");
          $("#category_idUpd").val("");
          $("#nameUpd").val("");
          Gym.loadAll();
          alert("Machine was updated");
        } else {
          alert("Machine was not updated");
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
          $("#brandUpd").val("");
          $("#modelUpd").val("");
          $("#category_idUpd").val("");
          $("#nameUpd").val("");
          Gym.loadAll();
          alert("Machine was deleted");
        } else {
          alert("Machine was not deleted");
        }
      },
    });
  }
}
