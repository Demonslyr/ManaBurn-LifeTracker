using Dapper;
using ManaburnDal.Enum;
using ManaburnDal.Models;
using ManaBurnServer.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ManaburnDal
{
    /// <summary>
    /// Manaburn In App Feedback
    /// </summary>
    public class FeedbackRepository
    {
        private const string SqlQueryTarget = "feedback";
        private readonly IDbConnection _connection;

        public FeedbackRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<Feedback>> SelectFeedbackRecordsByPage(int pageNumber, int pageSize)
        {
            var sQuery = $"SELECT fb.id, fb.message, fb.source, fb.createdby, fb.createdutc, fb.status FROM {SqlQueryTarget} as fb LIMIT @PageSize OFFSET @Offset";
            _connection.Open();
            return await _connection.QueryAsync<Feedback>(sQuery, new { PageSize = pageSize, Offset = pageNumber * pageSize });
        }

        public async Task<string> CreateFeedbackRecord(FeedbackSubmission feedback, string userId)
        {
            var query = $"INSERT INTO {SqlQueryTarget} (id, message, source, createdby, createdutc, status) VALUES(@Id, @Message, @Source, @CreatedBy, @CreatedUtc, @Status) RETURNING id";
            _connection.Open();
            return await _connection.QuerySingleAsync<string>(query, new
            {
                Id = Guid.NewGuid(),
                feedback.Message,
                feedback.Source,
                CreatedBy = userId,
                CreatedUtc = DateTime.UtcNow,
                Status = FeedbackStatusEnum.UnAcknowledged
            });
        }

        public async Task<int> DeleteFeedbackRecord(string feedbackRecordId)
        {
            var query = $"DELETE FROM {SqlQueryTarget} WHERE id = @Id and status = {FeedbackStatusEnum.Delete}";
            _connection.Open();
            return await _connection.ExecuteAsync(query, new
            {
                Id = feedbackRecordId
            });
        }
    }
}
