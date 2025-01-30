const EditIcon = ({ width = 30, height = 30, fill = "#747372", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 -0.5 25 25"
    width={width}
    height={height}
    {...rest}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m17.7 5.128 1.566 1.247a.748.748 0 0 1-.006 1.095l-1.19 1.424-4.049 4.829a.517.517 0 0 1-.27.163l-2.1.476a.529.529 0 0 1-.551-.46v-2.158a.464.464 0 0 1 .119-.28l3.974-4.493 1.364-1.63a.868.868 0 0 1 1.143-.213Z"
      clipRule="evenodd"
    />
    <path
      fill={fill}
      d="M12.033 7.619a.75.75 0 0 0 0-1.5v1.5Zm-2.8-.75v-.75h-.002l.002.75ZM5.5 10.619h.75v-.002l-.75.002Zm0 5.625.75.001v-.001H5.5Zm3.733 3.75-.002.75h.002v-.75Zm5.6 0v.75h.002l-.002-.75Zm3.733-3.75h-.75v.001l.75-.001Zm.75-3.75a.75.75 0 1 0-1.5 0h1.5Zm-3.43-5.81a.75.75 0 0 0-1.386.573l1.386-.573Zm2.346 2.938a.75.75 0 0 0-.324-1.465l.324 1.465ZM8.3 16.432a.75.75 0 1 0 0 1.5v-1.5Zm7.467 1.5a.75.75 0 0 0 0-1.5v1.5ZM12.033 6.119h-2.8v1.5h2.8v-1.5Zm-2.802 0A4.492 4.492 0 0 0 4.75 10.62l1.5-.003a2.992 2.992 0 0 1 2.985-2.998l-.004-1.5Zm-4.481 4.5v5.625h1.5v-5.625h-1.5Zm0 5.623a4.492 4.492 0 0 0 4.481 4.502l.004-1.5a2.992 2.992 0 0 1-2.985-2.999l-1.5-.003Zm4.483 4.502h5.6v-1.5h-5.6v1.5Zm5.602 0a4.492 4.492 0 0 0 4.481-4.502l-1.5.003a2.992 2.992 0 0 1-2.985 2.999l.004 1.5Zm4.481-4.5v-3.75h-1.5v3.75h1.5ZM14.5 7.257a4.653 4.653 0 0 0 1.187 1.658c.607.53 1.48.942 2.545.707l-.324-1.465c-.465.103-.869-.053-1.237-.373a3.16 3.16 0 0 1-.785-1.1l-1.386.573ZM8.3 17.932h7.467v-1.5H8.3v1.5Z"
    />
  </svg>
)
export default EditIcon
