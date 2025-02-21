// Reusable delete success handler
export const handleDeleteSuccess = (deletedId, setTodos, alertMessage = "Todo deleted successfully!") => {
  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedId));
  alert(alertMessage); // Simple alert for feedback
};
