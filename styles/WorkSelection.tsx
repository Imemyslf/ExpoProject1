import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  topContainer: {
    flex: 1.4, // 50% height
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  servicesContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    margin: 5,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    textAlign: "left",
  },
  selectedCategory: {
    backgroundColor: "#000",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  workList: {
    flex: 1.3,
    padding: 5,
    margin: 3,
  },
  workItem: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    textAlign: "left",
  },
  workText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomContainer: {
    flex: 1, // 50% height
    padding: 10,
    backgroundColor: "#fff",
  },
  selectedWorkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedWorkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  deleteIcon: {
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  noWorkText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    flex: 0.8,
    backgroundColor: "black",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
