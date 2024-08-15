export function getColorForUsername(username) {
    if (!username) return 
    
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33',
      '#8C33FF', '#33FFDA', '#DAFF33', '#FF3333', '#33FF73'
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }