   


    //changing some of the fields
    let formButton = document.querySelector("#formbtn");
    let inputFields = document.getElementsByTagName("input");
  
    let inUpdate = false;
     for (i = 0; i < inputFields.length; i++) {
                inputFields[i].style.display = 'none';
            }

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
