//https://codesandbox.io/invite/xy5fj7w6kzhz8dhs
import React, {useState} from "react"
const metaData = {
  suggestMeUniversity: {
    id: "suggestMeUniversity",
    name: "Suggest me University",
    type: "tag",
    options: null,
    api: false,
    validation: null,
    edges: [
      {
        id: "levelOfStudy",
        name: "Level of Study",
        type: "select",
        options: ["Undergraduate", "Graduate", "PhD"],
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {
          Undergraduate: [
            {
              id: "testScores",
              name: "Test Scores",
              type: "select",
              options: ["SAT", "ACT", "GRE", "GMAT"],
              api: false,
              validation: null,
              edges: [],
              conditionalEdges: {}
            }
          ],
          Graduate: [
            {
              id: "testScores",
              name: "Test Scores",
              type: "select",
              options: ["SAT", "ACT", "GRE", "GMAT"],
              api: false,
              validation: null,
              edges: [],
              conditionalEdges: {}
            }
          ]
        }
      },
      {
        id: "major",
        name: "Major",
        type: "input",
        options: null,
        api: true,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "gpa",
        name: "GPA",
        type: "input",
        options: null,
        api: false,
        validation: {
          min: 0,
          max: 4
        },
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "testScores",
        name: "Test Scores",
        type: "select",
        options: ["SAT", "ACT", "GRE", "GMAT"],
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "preferredLocation",
        name: "Preferred Location",
        type: "input",
        options: null,
        api: true,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "additionalDescriptionQuestion",
        name: "Additional Description",
        type: "textarea",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      }
    ],
    conditionalEdges: {}
  },
  questionAboutUniversity: {
    id: "questionAboutUniversity",
    name: "I Have a Question About a University",
    type: "tag",
    options: null,
    api: false,
    validation: null,
    edges: [
      {
        id: "levelOfStudy",
        name: "Level of Study",
        type: "select",
        options: ["Undergraduate", "Graduate", "PhD"],
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {
          Undergraduate: [
            {
              id: "testScores",
              name: "Test Scores",
              type: "select",
              options: ["SAT", "ACT", "GRE", "GMAT"],
              api: false,
              validation: null,
              edges: [],
              conditionalEdges: {}
            }
          ],
          Graduate: [
            {
              id: "testScores",
              name: "Test Scores",
              type: "select",
              options: ["SAT", "ACT", "GRE", "GMAT"],
              api: false,
              validation: null,
              edges: [],
              conditionalEdges: {}
            }
          ]
        }
      },
      {
        id: "universitySearch",
        name: "University Search Field",
        type: "input",
        options: null,
        api: true,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "relationToMajor",
        name: "Relation to Major/Field of Study",
        type: "checkbox",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "reviewSubCategories",
        name: "Related Tags",
        type: "tag",
        options: [
          "Admissions & Applications",
          "Financial Aid & Scholarships",
          "Academic Programs & Department",
          "Student Life & Services",
          "Career & Alumni Resources",
          "Athletics & Recreation",
          "Cultural & Arts Activities",
          "Sustainability & Campus Initiatives"
        ],
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "additionalDescriptionQuestion",
        name: "Additional Description",
        type: "textarea",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      }
    ],
    conditionalEdges: {}
  },
  reviewUniversity: {
    id: "reviewUniversity",
    name: "Review University",
    type: "tag",
    options: null,
    api: false,
    validation: null,
    edges: [
      {
        id: "universitySearch",
        name: "University Search Field",
        type: "input",
        options: null,
        api: true,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "relationToMajor",
        name: "Relation to Major/Field of Study",
        type: "checkbox",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "reviewSubCategories",
        name: "Related Tags",
        type: "tag",
        options: [
          "Admissions & Applications",
          "Financial Aid & Scholarships",
          "Academic Programs & Department",
          "Student Life & Services",
          "Career & Alumni Resources",
          "Athletics & Recreation",
          "Cultural & Arts Activities",
          "Sustainability & Campus Initiatives"
        ],
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "userRating",
        name: "Your Ratings",
        type: "select",
        options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "additionalDescriptionQuestion",
        name: "Additional Description",
        type: "textarea",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "anonymityOption",
        name: "Anonymity Option",
        type: "checkbox",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      },
      {
        id: "guidelinesReminder",
        name: "Guidelines Reminder",
        type: "label",
        options: null,
        api: false,
        validation: null,
        edges: [],
        conditionalEdges: {}
      }
    ],
    conditionalEdges: {}
  }
}

export const Graph = () => {
  // Initialize currentNode with an empty state
  const [currentNode, setCurrentNode] = useState(null)
  const [showOptions, setShowOptions] = useState(true) // Added state to control initial options display

  const handleNodeSelection = (nodeName) => {
    const selectedNode = metaData[nodeName]
    if (selectedNode) {
      setCurrentNode(selectedNode)
      setShowOptions(false) // Hide initial options once a choice is made
    }
  }

  const renderSelectNode = (node) => {
    // Render the select component here
    return (
      <select>
        {node.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
const renderInputNode = (node) => {
    // Render the input component here
    return <input type="text" placeholder={node.placeholder} />
  }
const renderTextareaNode = (node) => {
    // Render the textarea component here
    return <textarea placeholder={node.placeholder} />
  }
const renderNodeByType = (node) => {
    switch (node.type) {
      case "select":
        return renderSelectNode(node)
      case "input":
        return renderInputNode(node)
      case "textarea":
        return renderTextareaNode(node)
      // Add more cases for other types as needed
      default:
        return null // Handle unknown types or provide a default component
    }
  }

  return (
    <div>
      {showOptions ? (
        // Render the initial options
        <div>
          <h1>Choose an option:</h1>
          {Object.keys(metaData).map((key) => (
            <button key={key} onClick={() => handleNodeSelection(key)}>
              {metaData[key].name}
            </button>
          ))}
        </div>
      ) : (
        // Render the selected node
        <div>
          <h1>{currentNode.name}</h1>
          {currentNode.edges.map((child) => (
            <div key={child.id}>
              <h2>{child.name}</h2>
              {renderNodeByType(child)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
