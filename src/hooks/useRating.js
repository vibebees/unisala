import useCountConverter from "./useCountConverter"

const useRating = (data) => {
    const votes =
        Array.isArray(data) &&
        data &&
        data?.reduce((total, num) => total + num.votes, 0)
    return `${(
        Array.isArray(data) &&
        data?.reduce((total, num) => total + num.rating * num.votes, 0) / votes
    )?.toFixed(2)}*${useCountConverter(votes)}`
}
export default useRating
