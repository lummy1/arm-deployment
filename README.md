#Feedback on Questions asked for the Technical Test
#The Application can be found at https://arm-deployment.vercel.app/
# and application github repo is https://github.com/lummy1/arm-deployment

1. How long did you spend on the coding test?

	4 days

2. What would you add to your solution if you had more time? If you did not spend
much time on the coding test, then use this as an opportunity to explain what you
would add. 

I would have added news tags to the single article page, and  implemented search for news just like i did with the sidebar filter. Also I did not fully implement the spinner plugin, just added a loading text.


3. What was the most useful feature that was added to the latest version of your
chosen language? Please include a snippet of code that shows how you have used it.

startTransition Callback: introduced in React 18, allows us to specify some state updates as not as important. These state updates will be executed in parallel with other state updates, but the rendering of the component will not wait for these less important state updates. It helps to keep the application responsive even during the large data updates.

 startTransition(() => {
                            setNews(resp?.data);
                            setFilteredResults(true);
                            })


4. How would you track down a performance issue in production? Have you ever had
to do this? - 

I can track a performance issue by using the Chrome Dev Tools Performance Tab. There I can monitor the timings of the components and functions used in the app. We can also monitor from the source code by using the Profiler component and logging the result at runtime to a logger.



5. How would you improve marketaux that you just used? 

I would improve their revenue drive by mapping the IP of the registration system with the API Key in the background, that way users will not be able to use multiple emails when their free plan is exhausted and they will be forced to upgrade their plans.

On the functional side, I would have provided country entities for easier API calls based on country. Also, The articles did not have news authors which should have been displayed to avoid plagiarism.

6. On a scale of 1-10 what would you rate yourself?  8
