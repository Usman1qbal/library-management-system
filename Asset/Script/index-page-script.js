
function show_data()
{
  var total = get_total_id('Book');
  var i = total;
  var j=i;
  while(i>0)
  {
    var table = document.getElementById("Book-table");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    let book = JSON.parse(localStorage.getItem(`Book[${--i}]`));
    cell1.innerHTML = j--;
    cell2.innerHTML = book.BookName;
    cell3.innerHTML = book.Author;
    cell4.innerHTML = book.Publisher;
    cell5.innerHTML = book.Date;
    let buffer = i;
    var Delete = document.createElement('input'); // create a button
    Delete.setAttribute('type','button'); // set attributes ...
    Delete.setAttribute('class','Actions-column');
    Delete.setAttribute('value','Delete');
    Delete.onclick = function() { // set onclick handler
      deletion_index_book('Book',buffer,total);
      window.location.href="./index.html";
    }
    var update = document.createElement('input'); // create a button
    update.setAttribute('type','button'); // set attributes ...
    update.setAttribute('class','Actions-column');
    update.setAttribute('name','update');
    update.setAttribute('value','Update');
    update.onclick = function() { // set onclick handler
      var uri =`Update_book.html?Book,${buffer},${book.BookName},${book.Author},${book.Publisher},${book.Date},`;
      var res = encodeURI(uri);

      window.location.replace(res);
    }

    cell6.appendChild(Delete);
    cell6.appendChild(update);
  }
}

function show_Author()
{
  var total = get_total_id('Author');
  var i = total;
  var j=i;
  while(i>0)
  {
    var table = document.getElementById("Author-table");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    
    let Author = JSON.parse(localStorage.getItem(`Author[${--i}]`));
    
    cell1.innerHTML = Author.Name;
    cell2.innerHTML = Author.number_of_book;
    let buffer = i;
    var Delete = document.createElement('input'); // create a button
    Delete.setAttribute('type','button'); // set attributes ...
    Delete.setAttribute('class','Actions-column');
    Delete.setAttribute('value','Delete');
    Delete.onclick = function() { // set onclick handler
      //alert(buffer);
      delete_Author(buffer,total);
    }
    

    cell3.appendChild(Delete);
    
  }
}

function show_publisher()
{
  var total = get_total_id('Publisher');
  var i = total;
  var j=i;
  while(i>0)
  {
    var table = document.getElementById("Publisher-table");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    
    let Publisher = JSON.parse(localStorage.getItem(`Publisher[${--i}]`));
    
    cell1.innerHTML = Publisher.Name;
    cell2.innerHTML = Publisher.number_of_book;
    let buffer = i;
    var Delete = document.createElement('input'); // create a button
    Delete.setAttribute('type','button'); // set attributes ...
    Delete.setAttribute('class','Actions-column');
    Delete.setAttribute('value','Delete');
    Delete.onclick = function() { // set onclick handler
      //alert(buffer);
      delete_Publisher(buffer,total);
    }
    

    cell3.appendChild(Delete);
    
  }
}