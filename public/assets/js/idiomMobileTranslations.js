document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".idiom-question");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const answer = button.nextElementSibling;


            button.classList.toggle("active");


            if (answer.style.maxHeight) {

                answer.style.maxHeight = null;
                answer.style.padding = "0 15px";

            } else {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                answer.style.padding = "10px 15px";
            }

        });

    });

});
