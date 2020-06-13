using ManaburnDal;
using ManaburnDal.Models;
using ManaBurnServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManaBurnServer.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize(Policy = "ManaburnPolicy")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackRepository _feedbackRepository;
        private readonly ILogger _logger;

        public FeedbackController(ILogger<FeedbackController> logger, FeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
            _logger = logger;
        }

        /// <summary>
        /// Needs to return a list of Product summaries
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetPageOfFeedback(FeedbackRequest feedbackRequest)
        {
            try
            {
                // expecting page number (0 indexed)
                // expecting number of records per page (size of page)
                var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                _logger.LogInformation("Received a request to get product list from user inventory! {userId} {PageNumber} {PageSize}", userId, feedbackRequest.PageNumber, feedbackRequest.PageSize);
                return Ok(await _feedbackRepository.SelectFeedbackRecordsByPage(feedbackRequest.PageNumber, feedbackRequest.PageSize));
            }
            catch (Exception e)
            {
                // Todo: Add more identifiable information about this failure like userId or the token.
                _logger.LogError(e, $"Get enduser inventory product exception: {e.Message}.", feedbackRequest);
                return Ok(new GenericResponseModel
                {
                    Errors = e.Message
                });
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutFeedback(FeedbackSubmission feedback)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                _logger.LogInformation("Received a request to put product in user inventory!", userId);
                await _feedbackRepository.CreateFeedbackRecord(feedback, userId);
                return Ok();
            }
            catch (Exception e)
            {
                // Todo: Add more identifiable information about this failure like userId or the token.
                _logger.LogError(e, $"Put enduser inventory product exception: {e.Message}.");
                return Ok(new GenericResponseModel
                {
                    Errors = e.Message
                });
            }
        }
        [HttpDelete]
        public async Task<ActionResult<int>> DeleteProductFromUserInventory(string feedbackRecordId)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                _logger.LogInformation("Received a request to delete feedback!", userId);
                return await _feedbackRepository.DeleteFeedbackRecord(feedbackRecordId);
            }
            catch (Exception e)
            {
                // Todo: Add more identifiable information about this failure like userId or the token.
                _logger.LogError(e, $"Delete enduser inventory product exception: {e.Message}.");
                return Ok(new GenericResponseModel
                {
                    Errors = e.Message
                });
            }
        }
    }
}
