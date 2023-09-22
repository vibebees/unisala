import { gql } from "@apollo/client"

export const AddComment = gql`
    mutation addComment(
      $postId: String!
      $commentText: String
      $parentId: String
    ) {
      addComment(
        postId: $postId
        commentText: $commentText
        parentId: $parentId
        replyTo: $replyTo
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
    mutation addPost(
      $postText: String
      $unitId: Float
      $tags: [ID]
      $postTag: String
    ) {
      addPost(
        postText: $postText
        unitId: $unitId
        tags: $tags
        postTag: $postTag
      ) {
        status {
          success
          message
        }
        post {
          _id
          postText
          # postImage
          date
        }
      }
    }
  `,
  GetPostById = gql`
    query getPostById($id: String!, $user: String) {
      getPostById(id: $id, user: $user) {
        status {
          success
          message
        }
        post {
          _id
          postText
          postCommentsCount
          postImage
          date
          upVoted
          images
          upVoteCount
          user {
            _id
            firstName
            lastName
            username
            picture
          }
          comments {
            _id
            commentText
            upVoted
            upVoteCount
            user {
              _id
              firstName
              lastName
              picture
              username
            }
          }
        }
      }
    }
  `,
  EditPost = gql`
    mutation editPost($postId: String!, $postText: String, $postImage: String) {
      editPost(postId: $postId, postText: $postText, postImage: $postImage) {
        status {
          success
          message
        }
      }
    }
  `,
  DeletePost = gql`
    mutation deletePost($postId: String!) {
      deletePost(postId: $postId) {
        success
        message
      }
    }
  `,
  DeleteComment = gql`
    mutation deleteComment($id: String!) {
      deleteComment(id: $id) {
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
      $picture: String
      $coverPicture: String
      $username: String!
      $firstName: String!
      $lastName: String!
      $location: String
      $oneLinerBio: String
      $birthday: String
      $interestedSubjects: [ID]
      $userStatus: String
      $studyLevel: String
      $interestedUni: [Int]
    ) {
      editProfile(
        picture: $picture
        coverPicture: $coverPicture
        username: $username
        firstName: $firstName
        lastName: $lastName
        location: $location
        oneLinerBio: $oneLinerBio
        birthday: $birthday
        interestedSubjects: $interestedSubjects
        userStatus: $userStatus
        studyLevel: $studyLevel
        interestedUni: $interestedUni
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
  GetCommentList = gql`
    query commentList($postId: String!, $parentId: String) {
      commentList(postId: $postId, parentId: $parentId) {
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
          repliesCount
          upVoteCount
          upVoted
          picture
        }
      }
    }
  `,
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
  GetReplyList = (id, pid) =>
    gql`
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
      savedList(userId: $userId, page: $page, pageSize: 5) {
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
          coverPicture
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
  GetUserPost = gql`
    query getUserPost($userId: String, $page: Float!, $unitId: Float) {
      getUserPost(userId: $userId, page: $page, pageSize: 3, unitId: $unitId) {
        totalPosts
        Posts {
          _id
          images
          postText
          date
          upVoteCount
          postCommentsCount
          userId # Use userId instead of user
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
    }
  `,
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
  UnSavePost = gql`
    mutation unSave($postId: String!) {
      unSave(postId: $postId) {
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
        upVotesCount
        success
        message
      }
    }
  `,
  userSearch = (searchString) =>
    gql`
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
    query getUsers {
      getUsers {
        email
        picture
        username
      }
    }
  `,
  getMessagesGql = gql`
    query getMessages($_id: String!) {
      getMessages(_id: $_id) {
        pairs
        messages {
          _id
          seen
          senderId
          receiverId
          message {
            text
          }
        }
      }
    }
  `,
  getMessagesByIdGql = gql`
    query getMessagesByIdGql($senderId: ID!, $receiverId: ID!) {
      getMessagesByIdGql(senderId: $senderId, receiverId: $receiverId) {
        pairs
        messages {
          _id
          seen
          senderId
          receiverId
          message {
            text
          }
        }
      }
    }
  `,
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
    }
  `,
  AddTestScore = (testScores) =>
    gql`
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
  `,
  RecommendedConnectionList = gql`
    query {
      recommendedConnectionList {
        status {
          message
          success
        }
        user {
          _id
          firstName
          lastName
          username
          picture
          coverPicture
          location
        }
      }
    }
  `,
  addMessageGql = gql`
    mutation AddMessage($text: String!, $senderId: ID!, $recipientId: ID!) {
      addMessage(text: $text, senderId: $senderId, recipientId: $recipientId) {
        seen
        message {
          text
        }
        senderId
        recipientId
      }
    }
  `,
  getNewsFeed = gql`
    query fetchMyNewsFeed($userId: ID!) {
      fetchMyNewsFeed(userId: $userId) {
        postText
        postImage
        upVoted
        upVoteCount
        postCommentsCount
        type
        saved
        date
        _id
        images
        user {
          firstName
          lastName
          picture
          username
          _id
        }
      }
    }
  `,
  GetInterviewExperience = gql`
    query getInterviewExperience($unitId: Float!, $page: Int, $pageSize: Int) {
      getInterviewExperience(
        unitId: $unitId
        page: $page
        pageSize: $pageSize
      ) {
        status {
          success
          message
        }
        interviewExperience {
          uni_id
          applied_level
          status
          attempt
          university
          conversation
          major
        }
      }
    }
  `,
  GetSpaceCategory = gql`
    query searchSpaceCategory($q: String!, $count: Int) {
      searchSpaceCategory(q: $q, count: $count) {
        status {
          message
          success
        }
        spaceCategory {
          _id
          name
          parentId
          description
          image
          user {
            username
          }
        }
      }
    }
  `,
  GetAllPostBySpaceCategoryID = gql`
    query getAllPostBySpaceCategoryID($id: ID, $limit: Int, $page: Int) {
      getAllPostBySpaceCategoryID(id: $id, limit: $limit, page: $page) {
        status {
          success
          message
        }
        posts {
          _id
          postImage
          postText
          date
          upVoteCount
          postCommentsCount
          upVoted
          saved
          user {
            _id
            username
            firstName
            lastName
            picture
            username
          }
        }
      }
    }
  `,
  GetTopActiveSpaces = gql`
    query getTopActiveSpaces($limit: Int) {
      getTopActiveSpaces(limit: $limit) {
        status {
          success
          message
        }
        spaceCategory {
          _id
          name
          parentId
        }
      }
    }
  `,
  AddSpaceCategory = gql`
    mutation addSpaceCategory($name: String!, $description: String) {
      addSpaceCategory(name: $name, description: $description) {
        status {
          success
          message
        }
        spaceCategory {
          _id
          name
        }
      }
    }
  `,
  DeleteSpace = gql`
    mutation deleteSpaceCategoryById($id: ID!) {
      deleteSpaceCategoryById(id: $id) {
        success
        message
      }
    }
  `,
  GetAllQuestions = gql`
    query {
      getAllQuestions {
        status {
          success
          message
        }
        questions {
          text
          type
          options {
            key
            value
          }
          qnsNumber
          nextQuestion
        }
      }
    }
  `,
  EditSpace = gql`
    mutation editSpaceCategoryById(
      $id: ID!
      $name: String
      $image: String
      $description: String
    ) {
      editSpaceCategoryById(
        id: $id
        name: $name
        image: $image
        description: $description
      ) {
        status {
          message
          success
        }
        spaceCategory {
          _id
          name
          parentId
          image
          description
          user {
            _id
          }
        }
      }
    }
  `,
  GetOwnSpace = gql`
    query GetOwnSpace($limit: Int, $page: Int) {
      getOwnSpaceCategory(limit: $limit, page: $page) {
        status {
          message
          success
        }
        spaceCategory {
          _id
          name
          user {
            username
            _id
          }
        }
      }
    }
  `,
  GenerateSpaceNewsFeed = gql`
    query GenerateSpaceNewsFeed($limit: Int, $page: Int) {
      generateSpaceNewsFeedSystem(limit: $limit, page: $page) {
        status {
          message
          success
        }
        posts {
          _id
          postImage
          postText
          date
          upVoteCount
          postCommentsCount
          upVoted
          user {
            _id
            username
            firstName
            lastName
            picture
          }
          saved
          tags {
            _id
            name
          }
        }
      }
    }
  `,
  GetUserRoadMapSummary = gql`
    query getUserRoadMapSummary($userId: String!) {
      getUserRoadMapSummary(userId: $userId) {
        status {
          success
          message
        }
        data {
          _id
          summary
          date
          user {
            _id
            firstName
            lastName
          }
        }
      }
    }
  `
