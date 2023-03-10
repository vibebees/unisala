import { gql } from "@apollo/client"

export const AddComment = gql`
    mutation addComment(
      $postId: String!
      $commentText: String!
      $parentId: String!
    ) {
      addComment(
        postId: $postId
        commentText: $commentText
        parentId: $parentId
      ) {
        success
        message
      }
    }
  `,
  AddEducation = gql`
    mutation addEducation(
      $school: String!
      $degree: String
      $major: String
      $startDate: String!
      $graduationDate: String!
    ) {
      addEducation(
        school: $school
        degree: $degree
        major: $major
        startDate: $startDate
        graduationDate: $graduationDate
      ) {
        status {
          success
          message
        }
        education {
          private
          schools {
            _id
            school
            degree
            major
            startDate
            graduationDate
          }
        }
      }
    }
  `,
  AddPost = gql`
    mutation addPost($postText: String!, $postImage: String!) {
      addPost(postText: $postText, postImage: $postImage) {
        success
        message
      }
    }
  `,
  EditAbout = gql`
    mutation editAbout($about: String!) {
      editAbout(about: $about) {
        status {
          success
          message
        }
        about {
          text
          private
        }
      }
    }
  `,
  EditEducation = gql`
    mutation editEducation(
      $id: String!
      $school: String!
      $degree: String
      $major: String
      $startDate: String!
      $graduationDate: String!
    ) {
      editEducation(
        id: $id
        school: $school
        degree: $degree
        major: $major
        startDate: $startDate
        graduationDate: $graduationDate
      ) {
        status {
          success
          message
        }
        education {
          private
          schools {
            _id
            school
            degree
            major
            startDate
            graduationDate
          }
        }
      }
    }
  `,
  EditProfile = gql`
    mutation editProfile(
      $profilePicture: String
      $coverPicture: String
      $username: String!
      $firstName: String!
      $lastName: String!
      $location: String
      $oneLinerBio: String
      $birthday: String
    ) {
      editProfile(
        profilePicture: $profilePicture
        coverPicture: $coverPicture
        username: $username
        firstName: $firstName
        lastName: $lastName
        location: $location
        oneLinerBio: $oneLinerBio
        birthday: $birthday
      ) {
        status {
          success
          message
        }
        user {
          firstName
          lastName
          username
          oneLinerBio
          location
          age
          gender
          birthday
          name
          role
          verified
          blocked
          banned
          active
          picture
          doj
        }
      }
    }
  `,
  GetCommentList = (id, pid) => gql`
            query {
                 commentList (postId:"${id}", parentId:"${pid}") {
                   success
                   message
                            comments {
                              _id
                              userId
                              postId
                              commentText
                              commentImage
                              firstName
                              lastName
                              username
                              date
                            } 
                 }
             }`,
  GetProfileCard = gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        user {
          firstName
          lastName
          username
          badges {
            private
            earnedBadges {
              title
              description
              date
            }
          }
        }
      }
    }
  `,
  GetReplyList = (id, pid) => gql`
            query {
                replyList (postId:"${id}", parentId:"${pid}") {
                success
                message
                            comments {
                            _id
                            userId
                            postId
                            commentText
                            commentImage
                            firstName
                            lastName
                            username
                            date
                            } 
                }
            }`,
  GetSavedList = gql`
    query savedList($userId: String!, $page: Float) {
      savedList(userId: $userId, page: $page) {
        status {
          success
          message
        }
        Posts {
          _id
          postText
          postImage
          date
          postCommentsCount
          upVoted
          upVoteCount
          saved
          user {
            _id
            firstName
            lastName
            username
            picture
          }
        }
        totalPosts
      }
    }
  `,
  getUserGql = gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        connectionType {
          requestorId
          receiverId
          status
        }
        user {
          firstName
          lastName
          username
          age
          gender
          birthday
          name
          role
          verified
          location
          oneLinerBio
          doj
          blocked
          banned
          active
          picture
          _id
          about {
            text
            private
          }
          badges {
            private
            earnedBadges {
              title
              description
              date
            }
          }
          education {
            private
            schools {
              _id
              school
              degree
              major
              startDate
              graduationDate
            }
          }
          testScore {
            private
            scores {
              SAT_SCORE {
                english
                maths
              }
              ACT_SCORE {
                english
                maths
              }
              IELTS_SCORE {
                score
              }
              TOEFL_SCORE {
                score
              }
            }
          }
        }
      }
    }
  `,
  GetUserPost = (id, page) => gql`
    query {
        getUserPost(userId: "${id}", page:${page},pageSize:3) {
            totalPosts
            Posts {
              _id
              postImage
              postText
              date
              upVoteCount
              postCommentsCount
              user {
                _id
                firstName
                lastName
                picture
                username
              }
              saved
              upVoted
            } 
        }
    }`,
  GetVoterList = gql`
    query upVoteList($postId: String!, $page: Float) {
      upVoteList(postId: $postId, page: $page) {
        success
        message
        upVoters {
          _id
          firstName
          lastName
          picture
        }
      }
    }
  `,
  GetUserPost2 = (id, page) => gql`
    query {
      receivedConnectionList {
        status {
          success
          message
        }
        connectionList {
          _id
          status
          date
          user {
            firstName
            lastName
            username
            oneLinerBio
            birthday
            name
            role
            verified
            active
            picture
            location
          }
        }
      }
    }
  `,
  receivedGuestbookList = gql`
    query receivedGuestbookList(
      $userId: String!
      $page: Float
      $pageSize: Float
    ) {
      receivedGuestbookList(userId: $userId, page: $page, pageSize: $pageSize) {
        status {
          success
          message
        }
        guestbook {
          _id
          date
          message
          user {
            firstName
            lastName
            username
            verified
            picture
          }
        }
      }
    }
  `,
  SavePost = gql`
    mutation save($postId: String!) {
      save(postId: $postId) {
        success
        message
      }
    }
  `,
  sendGuestbookMessage = gql`
    mutation sendGuestbookMessage($receiverId: String!, $message: String!) {
      sendGuestbookMessage(receiverId: $receiverId, message: $message) {
        status {
          success
          message
        }
      }
    }
  `,
  ToggleView = gql`
    mutation toggleView($card: String!) {
      toggleView(card: $card) {
        status {
          success
          message
        }
        private
      }
    }
  `,
  UpVote = gql`
    mutation upVote($postId: String!) {
      upVote(postId: $postId) {
        success
        message
      }
    }
  `,
  userSearch = (searchString) => gql`
    query {
        searchUser(searchString: "${searchString}") {
            status {
                message
                success
            }
            user{
                _id
                firstName
                lastName
                username
                picture
                coverPicture
                location
                
            }
        }
    }`,
    getFriends = gql`
        query getUsers{
            getUsers{
                email
                picture
                username
            }
        }`,
    getMessages = gql`
        query getMessages($id: String!) {
            getMessages(id: $id){
                pairs
                messages{
                  seen
                  senderId
                  receiverId
                  message{
                    text
                  }
                 
                }
            }
        }`,
    DeleteEducation = gql`
        mutation deleteEducation($id: String!) {
            deleteEducation(id: $id) {
            status {
                success
                message
            }
            education {
                private
                schools {
                _id
                school
                degree
                major
                startDate
                graduationDate
                }
            }
            }
        }`,
    AddTestScore = (testScores) => gql`
            mutation addTestScore($testScores: ${testScores}) {
                addTestScore(testScore: $testScores) {
                status {
                    message
                    success
                }
                testScore {
                    scores {
                    SAT_SCORE {
                        maths
                        english
                    }
                    ACT_SCORE {
                        maths
                        english
                    }
                    IELTS_SCORE {
                        score
                    }
                    TOEFL_SCORE {
                        score
                    }
                    }
                }
                }
            }`,
  SendConnectRequest = gql`
    mutation sendConnectRequest($receiverId: String!) {
      sendConnectRequest(receiverId: $receiverId) {
        success
        message
      }
    }
  `,
  RemoveConnectRequest = gql`
    mutation removeConnectRequest($connecteeId: String!) {
      removeConnectRequest(connecteeId: $connecteeId) {
        success
        message
      }
    }
  `,
  ReceivedConnectionList = gql`
    query {
      receivedConnectionList {
        status {
          success
          message
        }
        connectionList {
          _id
          status
          date
          user {
            _id
            firstName
            lastName
            username
            oneLinerBio
            birthday
            name
            role
            verified
            active
            picture
            coverPicture
            location
          }
        }
      }
    }
  `,
  PendingConnectionList = gql`
    query {
      pendingConnectionList {
        status {
          success
          message
        }
        connectionList {
          _id
          status
          date
          user {
            _id
            firstName
            lastName
            username
            oneLinerBio
            birthday
            name
            role
            verified
            active
            picture
            location
            coverPicture
          }
        }
      }
    }
  `,
  ConnectedList = gql`
    query connectedList($userId: String!) {
      connectedList(userId: $userId) {
        status {
          message
          success
        }
        connectionList {
          date
          user {
            firstName
            lastName
            username
            _id
            picture
          }
        }
      }
    }
  `,
  AcceptConnectRequest = gql`
    mutation acceptConnectRequest($requestorId: String!) {
      acceptConnectRequest(requestorId: $requestorId) {
        success
        message
      }
    }
  `
