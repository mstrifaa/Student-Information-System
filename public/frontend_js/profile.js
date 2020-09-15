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

            for (i = 0; i < inputFields.length; i++) {
                inputFields[i].style.display = 'initial';
            }
    
            // code goes to take user text-inputs 

            inUpdate = true;
        }

        else if (inUpdate == true) {

            formButton.innerHTML = 'Update';

            for (i = 0; i < inputFields.length; i++) {
                inputFields[i].style.display = 'none';
            }
            //code goes to save user-inputs

            inUpdate = false;
        }
    }
