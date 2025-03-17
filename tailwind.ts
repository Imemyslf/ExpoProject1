import { create } from 'twrnc';

// Create the customized version of tailwind
const tw = create(require('./tailwind.config'));

// Export it for use in components
export default tw;