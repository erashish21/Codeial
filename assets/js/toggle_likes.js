// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.toggler).click(function(e) {
            e.preventDefault();
            let self = this;
            //

            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-like'));
                console.log(likesCount);

                if (data.data.deleted == true) {
                    likesCount--;
                } else {
                    likesCount++;
                }

                $(self).attr('data-like', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('Error in completing the request');
            });
        });
    }
}