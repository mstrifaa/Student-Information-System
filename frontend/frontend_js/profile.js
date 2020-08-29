    // to log out
    let drpdown = document.querySelector("select");

    drpdown.addEventListener('input', function(e){

        console.log(e.target);
        console.log(e.target.value);
    })


    //changing some of the fields
    let formButton = document.querySelector("#formbtn");
    console.log(formButton);

    let inUpdate = false;

    formButton.onclick = editProfile;

    function editProfile() {


        if (inUpdate == false) {

            formButton.innerHTML = 'Save';

            // code goes to take user text-inputs 

            inUpdate = true;
        }

        else if (inUpdate == true) {

            formButton.innerHTML = 'Update';

            //code goes to save user-inputs

            inUpdate = false;
        }
    }
