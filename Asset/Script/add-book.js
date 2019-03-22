
var i=0;

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
  }

function get_total_id(name)                         // get Array length accordingly from localstorage

{   let i=0;
    while(true)
    {
        if(`${name}[${i}]` in localStorage)
        {
            
            i++;
        } 
        else 
        {
            break;
        }
    }
    
    return i;
}

function find_check(lib,val)                        // function for getting total match from a required library
{
    let i =0;
    let total = get_total_id('Book') - 1;
    if(lib =="Author")
    {
        
        while(total>=0)
        {
            let obj = JSON.parse(localStorage.getItem(`Book[${total}]`));
            if(val.toLowerCase() === obj.Author.toLowerCase())
            {
                i++;
            }
            total--;
        }
    }
    else if(lib == "Publisher")
    {
        while(total>=0)
        {
            let obj = JSON.parse(localStorage.getItem(`Book[${total}]`));
            if(val.toLowerCase() == obj.Publisher.toLowerCase())
            {
                i++;
            }
            total--;
        }
    }
    return i;
}


function delete_entry(name,id,total)                // delete book entry
{           
   
    let data = JSON.parse(localStorage.getItem(`Book[${id}]`));

    if (confirm("Are you sure?")) 
    {
        console.log(id);
        while(id<total-1)
        {
           
            let next = JSON.parse(localStorage.getItem(`Book[${parseInt(id)+1}]`));
            
            let current = {
                BookName: next.BookName,
                Author: next.Author,
                Publisher: next.Publisher,
                Date: next.Date,
            };
            localStorage.removeItem(`${name}[${id}]`);
            
            localStorage.setItem(`Book[${id}]`,JSON.stringify(current));
            console.log(id+"==>"+current.BookName);
            id++;
        }
        localStorage.removeItem(`${name}[${id}]`);
    } 
   document.location.reload();
}
 

function save_Book(book_type)                       //  function for saving book 
{
    
    i = get_total_id('Book');                       // getting index of last book
    let j=0;
    let BookName = document.getElementById("BookName").value;
    let Author = document.getElementById("Author").value;
    let Publisher = document.getElementById("Publisher").value;
    let Date = document.getElementById("Date").value;
    
    var check = false;

    if(BookName == null || Author == null || Publisher == null || BookName.length === 0 || Author.length === 0 || Publisher.length === 0)
    {
        alert('Please Enter complete and correct data in all field');
    }
    else if(isValidDate(Date) == false)
    {
        alert("Incorrect Date, Please Enter Date in 'YYYY-MM-DD' format");
    }
    else
    {
       console.log(BookName+"===>"+Author+"===>"+Publisher);
        let j=0;
    
        while(j<i)                                  // check for avoiding duplicate entries
        {
            let myobj_deserialized = JSON.parse(localStorage.getItem(`Book[${j}]`));
            if(BookName.toLowerCase() == myobj_deserialized.BookName.toLowerCase() && Author.toLowerCase() == myobj_deserialized.Author.toLowerCase() &&
            Publisher.toLowerCase() == myobj_deserialized.Publisher.toLowerCase())
            {
                check = true;
                break;
            }
            j++;
            
        }
        if(check == false)                          // if book data is not stored previously
        {
            console.log(check);
            
            let Book = {
                BookName: BookName,
                Author: Author,
                Publisher: Publisher,
                Date: Date,
            };
            document.getElementById("BookName").value="";
            document.getElementById("Author").value = "";
            document.getElementById("Publisher").value="";
            document.getElementById("Date").value = "";

            let myobj_serialized = JSON.stringify(Book);
            localStorage.setItem(`Book[${i}]`,myobj_serialized);        
            let myobj_deserialized = JSON.parse(localStorage.getItem("Book"));
            console.log(myobj_deserialized);
            if(book_type == "new")
            {
                add_Author(Author);
                add_Publisher(Publisher);
            }
            alert("Your Data Save Successfully");
            i++;
        }
        else{
            document.getElementById("BookName").value="";
            document.getElementById("Author").value = "";
            document.getElementById("Publisher").value="";
            document.getElementById("Date").value = "";
            alert("Data Already Exist");
        }
    }
   
}

function add_new_book()                             // function for saving new book
{
    save_Book("new");
    window.location.href = "./index.html";
}

function delete_book_entry(lib,id,total)            // delete book entry
{           
   
    let data = JSON.parse(localStorage.getItem(`Book[${id}]`));
    
    if(lib == "Author")
    {
        let same = find_check('Publisher',data.Publisher);
        subtract_entry_Publisher(data.Publisher,same);
    }
    else if(lib == "Publisher")
    {
        console.log("author delete");
        let same = find_check('Author',data.Author);
        subtract_entry_author(data.Author,same);
    }


    if(id==total)
    {
        localStorage.removeItem(`Book[${id}]`);
    }
    else{

        while(id<total)
            {
            
                let next = JSON.parse(localStorage.getItem(`Book[${id+1}]`));
                let current = {
                    BookName: next.BookName,
                    Author: next.Author,
                    Publisher: next.Publisher,
                    Date: next.Date,
                };
                localStorage.removeItem(`Book[${id}]`);
                localStorage.setItem(`Book[${id}]`,JSON.stringify(current));
                console.log(id+"==>"+current.BookName);
                id++;
            }
            localStorage.removeItem(`Book[${id}]`);
        }
        
}

function deletion_index_book(lib,id,total)
{
    let data = JSON.parse(localStorage.getItem(`Book[${id}]`));
    subtract_entry_author(data.Author,1);
    subtract_entry_Publisher(data.Publisher,1);
    delete_entry(lib,id,total);
}

function delete_book_entry_Author(name,id,total)    // delete book entry
{           
   
    let data = JSON.parse(localStorage.getItem(`Book[${id}]`));
    subtract_entry_Publisher(data.Publisher,1);
    if (confirm("Are you sure?")) 
    {
        console.log(id);
        while(id<=total-1)
        {
            let next = JSON.parse(localStorage.getItem(`Book[${id+1}]`));
            let current = {
                BookName: next.BookName,
                Author: next.Author,
                Publisher: next.Publisher,
                Date: next.Date,
            };
            localStorage.removeItem(`${name}[${id}]`);
            
            localStorage.setItem(`Book[${id}]`,JSON.stringify(current));
            console.log(id+"==>"+current.BookName);
            id++;
        }
        localStorage.removeItem(`${name}[${id}]`);
    } 
    
}

var value = decodeURI(window.location.href);
var array = value.split('?'); 
var val = array[1].split(',');
const get_buffer = val[1];
const Author_name_update =val[3];
const Publisher_name_update =val[4];


function Update_book_detail_load()                  // function for load data on update_book.html
{
    document.getElementById('BookName').value = val[2];
    document.getElementById('Author').value = val[3];
    document.getElementById('Publisher').value = val[4];
    document.getElementById('Date').value = val[5];   
}

function add_Author(Author_name)                    // Adding and updating Author data
{
 
    let i=0;
    let number_of_book = 1;
    while(true)
    {
        if(`Author[${i}]` in localStorage)
        {
            let myobj_deserialized = JSON.parse(localStorage.getItem(`Author[${i}]`));

            if(myobj_deserialized.Name.toLowerCase() == Author_name.toLowerCase())
            {
                number_of_book = (1 + parseInt(myobj_deserialized.number_of_book)).toString();
               break; 
            }
            
            i++;
        } 
        else 
        {
            break;
        }
    }

    let Author = {
        Name: Author_name,
        number_of_book: number_of_book
    };
    
    let myobj_serialized = JSON.stringify(Author);
    localStorage.setItem(`Author[${i}]`,myobj_serialized);
}

function subtract_entry_author(Author_name,same)    // function for decrement of author book number
{
    var author_id = get_total_id('Author');
    let i=0;
    while(i<author_id)
    {
        author_id = get_total_id('Author');
        let myobj_deserialized = JSON.parse(localStorage.getItem(`Author[${i}]`));
            if(Author_name.toLowerCase() == myobj_deserialized.Name.toLowerCase() )
            {
                
                let current = {
                    Name: myobj_deserialized.Name,
                    number_of_book: (parseInt(myobj_deserialized.number_of_book) - parseInt(same)).toString()
                };
                localStorage.removeItem(`Author[${i}]`);
                
                localStorage.setItem(`Author[${i}]`,JSON.stringify(current));
                break;
            }
        i++;
    }
}

function add_Publisher(Publisher_name)              // function for adding and Updating of Publisher data
{
 
    let i=0;
    let number_of_book  = 1;
    while(true)
    {
        if(`Publisher[${i}]` in localStorage)
        {
            let myobj_deserialized = JSON.parse(localStorage.getItem(`Publisher[${i}]`));

            if(myobj_deserialized.Name.toLowerCase() == Publisher_name.toLowerCase())
            {
                number_of_book = (1 + parseInt(myobj_deserialized.number_of_book)).toString();
               break; 
            }
            
            i++;
        } 
        else 
        {
            break;
        }
    }

    let Publisher = {
        Name: Publisher_name,
        number_of_book: number_of_book
    };
    
    let myobj_serialized = JSON.stringify(Publisher);
    localStorage.setItem(`Publisher[${i}]`,myobj_serialized);
}

function subtract_entry_Publisher(name,same)        // function for decrement of Publisher data
{
    let Publisher_id = get_total_id('Publisher');
    Publisher_id--;
    while(Publisher_id=>0)
    {
        let myobj_deserialized = JSON.parse(localStorage.getItem(`Publisher[${Publisher_id}]`));
            if(name.toLowerCase() == myobj_deserialized.Name.toLowerCase() )
            {
            
                let current = {
                    Name: myobj_deserialized.Name,
                    number_of_book: (parseInt(myobj_deserialized.number_of_book) - parseInt(same)).toString()
                };
                localStorage.removeItem(`Publisher[${Publisher_id}]`);
                
                localStorage.setItem(`Publisher[${Publisher_id}]`,JSON.stringify(current));
                break;
            }
            Publisher_id--;
    }
}

function update_Book_detail()                       // updation of book detail
{
     i = get_buffer;
    let BookName = document.getElementById('BookName').value;
    let Author =document.getElementById('Author').value;
    let Publisher = document.getElementById('Publisher').value;
    let Date =document.getElementById('Date').value;

    let obj = JSON.parse(localStorage.getItem(`Book[${i}]`));
    if(BookName == obj.BookName && Author == obj.Author && Publisher == obj.Publisher && Date == obj.Date)
    {
        alert("Please change the data for Updation");
    }
    else
    {
        if(Author.toLowerCase() != obj.Author.toLowerCase())  // if user has change the Author name
        {
            subtract_entry_author(obj.Author,1);
            add_Author(Author);

        }    
        
        if(Publisher.toLowerCase() != obj.Publisher.toLowerCase())
        {
            subtract_entry_Publisher(obj.Publisher,1);
            add_Publisher(Publisher);
        }

        var total = get_total_id('Book');
        delete_entry("Book",i,total);
        save_Book("Duplicate");
        window.location.href = "./index.html";
    }
}

function delete_Author(id,total)
{
        let next = JSON.parse(localStorage.getItem(`Author[${id}]`));
        const Author = next.Name;
        const Author_books = next.number_of_book;
        if (confirm(`Are you sure you want to delete "${Author}" Author?`)) 
        { 
            while(id < total-1)                                                                             // publisher deletion
            {
               
                let next = JSON.parse(localStorage.getItem(`Author[${id+1}]`));
                let current = 
                {
                    Name: next.Name,
                    number_of_book: next.number_of_book
                };
                localStorage.removeItem(`Author[${id}]`);
                
                localStorage.setItem(`Author[${id}]`,JSON.stringify(current));
                console.log(id+"==>"+current.Name);
                id++;
            }
            localStorage.removeItem(`Author[${id}]`);
    
            if(Author_books != 0)                                            // for book  deletion and Author Updation if Author book greater than zero
            {                           
                var totalBooks = get_total_id('Book') ;
                let idB = 0;                                      
                while(idB<=totalBooks)
                    {
                        totalBooks = get_total_id('Book')-1 ;
                        if(idB<=totalBooks)
                        {
                            let nextb = JSON.parse(localStorage.getItem(`Book[${idB}]`));
                            if(nextb.Author.toLowerCase() == Author.toLowerCase() )
                            {
                                delete_book_entry('Author',idB,totalBooks);
                            }
                            
                            idB++;
                            console.log(idB);
                        }
                    }
            }
        alert("Author Deleted Successfully");
        document.location.reload();
    
        }
}

function delete_Publisher(id,total)
{
    let next = JSON.parse(localStorage.getItem(`Publisher[${id}]`));
    const Publisher = next.Name;
    const publisher_books = next.number_of_book;
    if (confirm(`Are you sure you want to delete "${Publisher}" Publisher?`)) 
    { 
        while(id < total-1)                                                                             // publisher deletion
        {           
            let next = JSON.parse(localStorage.getItem(`Publisher[${id+1}]`));
            let current = 
            {
                Name: next.Name,
                number_of_book: next.number_of_book
            };
            localStorage.removeItem(`Publisher[${id}]`);
            localStorage.setItem(`Publisher[${id}]`,JSON.stringify(current));
            console.log(id+"==>"+current.Name);
            id++;
        }
        localStorage.removeItem(`Publisher[${id}]`);

        if(publisher_books != 0)                                            // for book  deletion and Author Updation if publisher book greater than zero
        {                           
            var totalBooks = get_total_id('Book') ;
            let idB = 0;                                      
            while(idB<=totalBooks)
                {
                    totalBooks = get_total_id('Book') - 1;
                    if(idB<=totalBooks)
                    {
                        let nextb = JSON.parse(localStorage.getItem(`Book[${idB}]`));
                        if(nextb.Publisher.toLowerCase() == Publisher.toLowerCase() )
                        {
                            delete_book_entry('Publisher',idB,totalBooks);
                        }
                        
                        idB++;
                        console.log(idB);
                    }
                }
        }
    alert("Publisher Deleted Successfully");
    document.location.reload();

    }
}


