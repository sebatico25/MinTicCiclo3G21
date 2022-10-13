const ApiUrl =
  "https://g4ae417831de291-su1ot2zeon4jtmxr.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message/";

class Message {
  static insert() {
    const message = {
      messagetext: $("#messagetextUpd").val(),
    };
    $.ajax({
      type: "POST",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify(message),
      contentType: "application/json",
      complete: function (response) {
        if (response.status === 201) {
          $("#idUpd").val("");
          $("#messagetextUpd").val("");
          Message.loadAll();
          alert("Message was added");
        } else {
          alert("Message was not addes");
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
              <td>${data.items[index].id}</td>
              <td>
                <a href="#" onclick="Message.loadById(${data.items[index].id})">
                  ${data.items[index].messagetext}
                </a>
              </td>
            </tr>`);
        }
      },
      error: function () {
        alert("there are no message");
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
          alert("Message does not exist");
        } else {
          $("#message-details").html(`
              <form action="" class="form"><h1 class="title">Message Details</h1><div class="inputContainer"><input type="number" id="idUpd" class="input" value="${data.items[0].id}" placeholder="a"/><label for="idUpd" class="label">Id</label></div>
              <div class="inputContainerEmail"><textarea id="messagetextUpd" class="estilotextarea" cols="80" rows="10" required placeholder="a"/>${data.items[0].messagetext}</textarea> <label for="messagetextUpd" class="label"></label></div>
              <section id="button-Detail" class="buttonDetails">
              <button onclick="Message.insert()" type="button" class="submitBtn">Insert</button>
              <button onclick="Message.update()" type="button" class="submitBtn">Update</button>
              <button onclick="Message.deleteById(${data.items[0].id})" type="button" class="submitBtn">Delete</button></section>
            `);
        }
      },
      error: function () {},
    });
  }

  static update() {
    const message = {
      id: $("#idUpd").val(),
      name: $("#messagetextUpd").val(),
    };
    $.ajax({
      type: "PUT",
      url: ApiUrl,
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify(message),
      contentType: "application/json",
      complete: function (response) {
        if (response.status === 200) {
          $("#idUpd").val("");
          $("#messagetextUpd").val("");
          Message.loadAll();
          alert("Message was updated");
        } else {
          alert("Message was not updated");
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
          $("#messagetextUpd").val("");
          Message.loadAll();
          alert("Message was deleted");
        } else {
          alert("Message was not deleted");
        }
      },
    });
  }
}
