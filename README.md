# laravel-react-inertia-ssr-users-permissions

### Description: 
this is a website like reddit where user can upvote and downvote features, where it has permission so only admin can do 
the full crud operations on features, has full control on other users, can do upvote, downvote and make comments,
commenters can upvote, downvote and make comments, regular users can only upvote and downvote,
in this projects i have used the infinite scroll where as long as you scroll the features load,
i tested the uesPoll() where it fetches data every specific time for refreshing the data if another user has made a upvote, downvote or comment,
but i didn't use it because i make the show feature page load before the comments and when the comments load it refresh the page data and load the comments,
to make the show page load faster and didn't have to wait for the comments and their backend opertaions.
