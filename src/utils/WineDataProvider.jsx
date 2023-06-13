export const WineDataProvider = {
    wineById: async (id) => {
      try {
        // http://localhost:3001
        const request = await fetch(`/wines/${id}`, {
          method: "GET",
        });
        const result = await request.json();
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
  };  