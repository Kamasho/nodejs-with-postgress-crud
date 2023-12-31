$(document).ready(function() {
    $(".delete-recipe").on('click',function() {
        var id = $(this).data('id');
        var url = '/delete/' + id;
        if(confirm('Delete Recipe?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log("Deleting recipe...");
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            })
        }
    });

    $(".update-recipe").on('click',function() {
        $('#edit-form-id').val($(this).data('id'));
        $('#edit-form-name').val($(this).data('name'));
        $('#edit-form-ingredients').val($(this).data('ingredients'));
        $('#edit-form-directions').val($(this).data('directions'));
    });
});